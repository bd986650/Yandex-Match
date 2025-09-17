"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./RoomMap.module.css";

interface Point {
  x: number;
  y: number;
}

interface Room {
  id: string;
  name: string;
  points: Point[];
  type: "room" | "corridor" | "stairs" | "elevator";
}

interface FloorPlan {
  rooms: Room[];
}

type EditorMode = "select" | "create-room" | "delete";

function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [floorPlan, setFloorPlan] = useState<FloorPlan>({ rooms: [] });
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<EditorMode>("select");
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [roomCounter, setRoomCounter] = useState(1);
  const [scale, setScale] = useState(1); // масштаб

  // Отрисовка
  const drawFloorPlan = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(scale, scale);

    // Сетка
    drawGrid(ctx, canvas.width / scale, canvas.height / scale);

    // Комнаты
    floorPlan.rooms.forEach((room) => {
      drawRoom(ctx, room, room.id === selectedRoom);
    });

    // Рисуем текущую комнату
    if (isDrawing && currentPoints.length > 1) {
      ctx.strokeStyle = "#007bff";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      currentPoints.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();
  }, [floorPlan, selectedRoom, isDrawing, currentPoints, scale]);

  useEffect(() => {
    drawFloorPlan();
  }, [drawFloorPlan]);

  // Обработка клика
  const handleCanvasClick = (event: React.MouseEvent) => {
    const point = getCanvasPoint(event);

    switch (editorMode) {
      case "select":
        handleSelectMode(point);
        break;
      case "create-room":
        handleCreateMode(point);
        break;
      case "delete":
        handleDeleteMode(point);
        break;
    }
  };

  const handleSelectMode = (point: Point) => {
    const room = findRoomAtPoint(point);
    setSelectedRoom(room?.id || null);
  };

  const handleCreateMode = (point: Point) => {
    if (!isDrawing) {
      setIsDrawing(true);
      setCurrentPoints([point]);
    } else {
      setCurrentPoints((prev) => [...prev, point]);
    }
  };

  const handleDeleteMode = (point: Point) => {
    const room = findRoomAtPoint(point);
    if (room) {
      setFloorPlan((prev) => ({
        rooms: prev.rooms.filter((r) => r.id !== room.id),
      }));
      if (selectedRoom === room.id) setSelectedRoom(null);
    }
  };

  const completeDrawing = () => {
    if (currentPoints.length >= 3) {
      const newRoom: Room = {
        id: `room-${roomCounter}`,
        name: `Комната ${roomCounter}`,
        points: [...currentPoints, currentPoints[0]], // замыкаем
        type: "room",
      };
      setFloorPlan((prev) => ({ rooms: [...prev.rooms, newRoom] }));
      setRoomCounter((prev) => prev + 1);
    }
    setIsDrawing(false);
    setCurrentPoints([]);
  };

  // ===== Вспомогательные =====
  const findRoomAtPoint = (point: Point): Room | undefined => {
    return floorPlan.rooms.find((room) => isPointInPolygon(point, room.points));
  };

  const getCanvasPoint = (event: React.MouseEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: ((event.clientX - rect.left) * scaleX) / scale,
      y: ((event.clientY - rect.top) * scaleY) / scale,
    };
  };

  // ===== Экспорт JSON =====
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(floorPlan, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "floorPlan.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ===== Импорт JSON =====
  const uploadJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        const data = JSON.parse(text);
        setFloorPlan(data);
      } catch {
        alert("Ошибка: неправильный JSON");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.container}>
      <h1>Редактор и карта плана этажа</h1>

      {/* Панель инструментов */}
      <div className={styles.toolbar}>
        <button
          className={editorMode === "select" ? styles.active : ""}
          onClick={() => setEditorMode("select")}
        >
          🖱️ Выбор
        </button>
        <button
          className={editorMode === "create-room" ? styles.active : ""}
          onClick={() => setEditorMode("create-room")}
        >
          🏗️ Создать комнату
        </button>
        <button
          className={editorMode === "delete" ? styles.active : ""}
          onClick={() => setEditorMode("delete")}
        >
          🗑️ Удалить
        </button>
        {isDrawing && (
          <button onClick={completeDrawing}>✅ Завершить</button>
        )}
      </div>

      {/* Масштаб */}
      <div className={styles.zoomPanel}>
        <button onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}>➖</button>
        <span>{Math.round(scale * 100)}%</span>
        <button onClick={() => setScale((s) => Math.min(3, s + 0.1))}>➕</button>
      </div>

      {/* Canvas */}
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          width={1000}
          height={700}
          onClick={handleCanvasClick}
          className={styles.canvas}
        />
      </div>

      {/* Инфо */}
      <div className={styles.sidebar}>
        {selectedRoom ? (
          <>
            <h3>Выбранная комната:</h3>
            <p>ID: {selectedRoom}</p>
            <p>
              Название:{" "}
              {floorPlan.rooms.find((r) => r.id === selectedRoom)?.name}
            </p>
          </>
        ) : (
          <p>Кликните на комнату, чтобы выбрать её</p>
        )}
      </div>

      {/* Экспорт / Импорт */}
      <div className={styles.exportPanel}>
        <button onClick={downloadJSON}>⬇️ Скачать JSON</button>
        <label className={styles.uploadBtn}>
          📂 Загрузить JSON
          <input
            type="file"
            accept="application/json"
            onChange={uploadJSON}
            hidden
          />
        </label>
      </div>
    </div>
  );
}

// ======= Отрисовка =======
function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawRoom(ctx: CanvasRenderingContext2D, room: Room, isSelected: boolean) {
  ctx.fillStyle = getRoomColor(room.type);
  ctx.strokeStyle = isSelected ? "#fc1d1dff" : "#19bb65ff";
  ctx.lineWidth = isSelected ? 5 : 4;

  ctx.beginPath();
  ctx.moveTo(room.points[0].x, room.points[0].y);
  for (let i = 1; i < room.points.length; i++) {
    ctx.lineTo(room.points[i].x, room.points[i].y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // подпись
  const centerX = room.points.reduce((s, p) => s + p.x, 0) / room.points.length;
  const centerY = room.points.reduce((s, p) => s + p.y, 0) / room.points.length;
  ctx.fillStyle = "#000";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(room.name, centerX, centerY);
}

function getRoomColor(type: string): string {
  const colors: Record<string, string> = {
    room: "#ffffffff",
    corridor: "#fff3e0",
    stairs: "#f3e5f5",
    elevator: "#e8f5e8",
  };
  return colors[type] || "#f5f5f5";
}

// Проверка точки внутри полигона
function isPointInPolygon(point: Point, polygon: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x,
      yi = polygon[i].y;
    const xj = polygon[j].x,
      yj = polygon[j].y;
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export default HomePage;
