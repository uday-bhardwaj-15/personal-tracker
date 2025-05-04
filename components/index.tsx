"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Moon,
  Droplets,
  Activity,
  Sparkles,
  BookOpen,
  Smartphone,
  Check,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  ArrowUp,
  ArrowDown,
  Settings as SettingsIcon,
  Plus,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Mock data for the application
const HABIT_DATA = [
  {
    id: 1,
    name: "Sleep",
    icon: "sleep",
    target: 8,
    unit: "hours",
    color: "#9b87f5",
  },
  {
    id: 2,
    name: "Water",
    icon: "water",
    target: 8,
    unit: "glasses",
    color: "#64b5f6",
  },
  {
    id: 3,
    name: "Exercise",
    icon: "exercise",
    target: 30,
    unit: "minutes",
    color: "#ff7043",
  },
  {
    id: 4,
    name: "Meditation",
    icon: "meditation",
    target: 10,
    unit: "minutes",
    color: "#81c784",
  },
  {
    id: 5,
    name: "Reading",
    icon: "reading",
    target: 20,
    unit: "pages",
    color: "#ba68c8",
  },
  {
    id: 6,
    name: "Screen Time",
    icon: "screen",
    target: 120,
    unit: "minutes",
    color: "#4fc3f7",
  },
];

const WEEKLY_DATA = [
  {
    day: "Mon",
    sleep: 7.5,
    water: 6,
    exercise: 20,
    meditation: 5,
    reading: 15,
    screenTime: 180,
  },
  {
    day: "Tue",
    sleep: 8,
    water: 8,
    exercise: 30,
    meditation: 10,
    reading: 20,
    screenTime: 120,
  },
  {
    day: "Wed",
    sleep: 6.5,
    water: 5,
    exercise: 45,
    meditation: 15,
    reading: 10,
    screenTime: 90,
  },
  {
    day: "Thu",
    sleep: 7,
    water: 7,
    exercise: 0,
    meditation: 0,
    reading: 5,
    screenTime: 200,
  },
  {
    day: "Fri",
    sleep: 8,
    water: 8,
    exercise: 60,
    meditation: 10,
    reading: 30,
    screenTime: 100,
  },
  {
    day: "Sat",
    sleep: 9,
    water: 6,
    exercise: 90,
    meditation: 20,
    reading: 40,
    screenTime: 60,
  },
  {
    day: "Sun",
    sleep: 8.5,
    water: 9,
    exercise: 45,
    meditation: 15,
    reading: 25,
    screenTime: 150,
  },
];

const STREAK_DATA = [
  { habit: "Sleep", current: 7, longest: 14 },
  { habit: "Water", current: 3, longest: 21 },
  { habit: "Exercise", current: 5, longest: 30 },
  { habit: "Meditation", current: 10, longest: 15 },
  { habit: "Reading", current: 12, longest: 25 },
  { habit: "Screen Time", current: 4, longest: 10 },
];

const DAILY_PROGRESS = {
  sleep: 7.5,
  water: 6,
  exercise: 35,
  meditation: 8,
  reading: 15,
  screenTime: 110,
};

const COLORS = [
  "#9b87f5",
  "#64b5f6",
  "#ff7043",
  "#81c784",
  "#ba68c8",
  "#4fc3f7",
];

const Index = () => {
  // State for the application
  const [activeHabit, setActiveHabit] = useState(HABIT_DATA[0]);
  const [todayProgress, setTodayProgress] = useState(DAILY_PROGRESS);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [habits, setHabits] = useState(HABIT_DATA);
  const [currentView, setCurrentView] = useState("dashboard"); // dashboard, stats, calendar
  const [newHabit, setNewHabit] = useState({
    name: "",
    target: 0,
    unit: "",
    color: "#9b87f5",
  });

  // Dynamic date for the dashboard
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", dateOptions);

  // Get habit icon based on habit name
  const getHabitIcon = (habitName: string) => {
    switch (habitName.toLowerCase()) {
      case "sleep":
        return <Moon size={24} />;
      case "water":
        return <Droplets size={24} />;
      case "exercise":
        return <Activity size={24} />;
      case "meditation":
        return <Sparkles size={24} />;
      case "reading":
        return <BookOpen size={24} />;
      case "screen time":
        return <Smartphone size={24} />;
      default:
        return <Check size={24} />;
    }
  };

  // Update progress values
  const handleProgressChange = (habitKey: string, value: number) => {
    setTodayProgress((prev) => ({
      ...prev,
      [habitKey]: value,
    }));
  };

  // Add new habit
  const handleAddHabit = () => {
    if (newHabit.name && newHabit.target > 0 && newHabit.unit) {
      const id = habits.length + 1;
      setHabits([
        ...habits,
        { ...newHabit, id, icon: newHabit.name.toLowerCase() },
      ]);
      setNewHabit({ name: "", target: 0, unit: "", color: "#9b87f5" });
      setShowAddHabit(false);
    }
  };

  // Handle slider change for habit progress
  const handleSliderChange = (habitKey: string, values: number[]) => {
    const value = values[0];
    handleProgressChange(habitKey, value);
  };

  // Floating Background Elements with improved animation
  const FloatingElements = () => {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-[#181035] bg-opacity-95"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "soft-light",
            filter: "contrast(1.2)",
          }}
        ></div>

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: `linear-gradient(135deg, ${
                COLORS[i % COLORS.length]
              }80, ${COLORS[(i + 2) % COLORS.length]}50)`,
              width: `${Math.random() * 180 + 50}px`,
              height: `${Math.random() * 180 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(8px)",
            }}
            initial={{
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 180,
              opacity: 0.05,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.8 + 0.8],
              rotate: [Math.random() * 180, Math.random() * 360],
              opacity: [0.05, Math.random() * 0.15 + 0.05],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 15 + 20,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Component for the navigation bar
  const Navbar = () => {
    return (
      <motion.nav
        className="flex justify-between items-center p-4 backdrop-blur-md bg-white/5 rounded-lg mb-6 z-10 border border-white/10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <TrendingUp className="text-white" size={20} />
          </motion.div>
          <h1 className="text-xl font-bold text-white">Personal Tracker</h1>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`px-3 py-1 rounded-md text-sm ${
              currentView === "dashboard"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView("stats")}
            className={`px-3 py-1 rounded-md text-sm ${
              currentView === "stats"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setCurrentView("calendar")}
            className={`px-3 py-1 rounded-md text-sm ${
              currentView === "calendar"
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            Calendar
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(true)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            <SettingsIcon size={16} className="text-white" />
          </button>

          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User avatar"
              className="w-8 h-8 rounded-full border border-purple-400"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-white"></div>
          </div>
        </div>
      </motion.nav>
    );
  };

  // Component for the dashboard view
  const Dashboard = () => {
    return (
      <div className="space-y-6">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <h2 className="text-2xl font-bold text-white">{formattedDate}</h2>
            <p className="text-gray-400">
              Track your daily habits and build consistency
            </p>
          </div>

          <motion.button
            className="mt-4 md:mt-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 opacity-90 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddHabit(true)}
          >
            <Plus size={18} />
            <span>Add Habit</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, staggerChildren: 0.1 }}
        >
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-5 hover:bg-white/15 transition cursor-pointer border border-white/5"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
              }}
              onClick={() => setActiveHabit(habit)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: habit.color, opacity: 0.8 }}
                  >
                    {getHabitIcon(habit.name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{habit.name}</h3>
                    <p className="text-sm text-gray-400">
                      Target: {habit.target} {habit.unit}
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-full py-1 px-3">
                  <span className="text-sm font-medium text-white">
                    {STREAK_DATA.find((s) => s.habit === habit.name)?.current ||
                      0}{" "}
                    day streak
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
                  <span>Today&apos;s Progress</span>
                  <span>
                    {
                      todayProgress[
                        habit.name.toLowerCase() as keyof typeof todayProgress
                      ]
                    }{" "}
                    / {habit.target} {habit.unit}
                  </span>
                </div>

                <div className="mt-4 mb-1">
                  <Slider
                    defaultValue={[
                      todayProgress[
                        habit.name.toLowerCase() as keyof typeof todayProgress
                      ],
                    ]}
                    max={habit.target * 2}
                    step={
                      habit.name === "Sleep" || habit.name === "Water" ? 0.5 : 5
                    }
                    onValueChange={(values) =>
                      handleSliderChange(habit.name.toLowerCase(), values)
                    }
                    className="py-2"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Check className="text-green-400" size={16} />
                  <span className="text-sm text-gray-300">
                    {Math.round(
                      (todayProgress[
                        habit.name.toLowerCase() as keyof typeof todayProgress
                      ] /
                        habit.target) *
                        100
                    )}
                    % complete
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Weekly Progress</h3>
            <div className="flex items-center space-x-2">
              <select
                className="bg-white/10 text-white text-sm py-1 px-2 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) =>
                  setActiveHabit(
                    habits.find((h) => h.id === parseInt(e.target.value)) ||
                      habits[0]
                  )
                }
                value={activeHabit.id}
              >
                {habits.map((habit) => (
                  <option
                    key={habit.id}
                    value={habit.id}
                    className="bg-gray-800"
                  >
                    {habit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={WEEKLY_DATA}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={activeHabit.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={activeHabit.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(23, 23, 70, 0.8)",
                    borderColor: "#9b87f5",
                    borderRadius: "0.5rem",
                  }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "#9b87f5" }}
                />
                <Area
                  type="monotone"
                  dataKey={activeHabit.name.toLowerCase()}
                  stroke={activeHabit.color}
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    );
  };

  // Component for the statistics view
  const Statistics = () => {
    return (
      <div className="space-y-6">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">
            Habit Completion Rates
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={habits.map((habit) => {
                  // Calculate average completion rate from weekly data
                  const habitKey = habit.name.toLowerCase();
                  const completionSum = WEEKLY_DATA.reduce((sum, day) => {
                    const value = day[habitKey as keyof typeof day];
                    return sum + (Number(value) / habit.target) * 100;
                  }, 0);
                  const avgCompletion = Math.min(
                    100,
                    completionSum / WEEKLY_DATA.length
                  );

                  return {
                    name: habit.name,
                    completion: avgCompletion,
                    color: habit.color,
                  };
                })}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  formatter={(value: any) => [
                    `${Number(value).toFixed(1)}%`,
                    "Completion Rate",
                  ]}
                  contentStyle={{
                    backgroundColor: "rgba(23, 23, 70, 0.8)",
                    borderColor: "#9b87f5",
                    borderRadius: "0.5rem",
                  }}
                  labelStyle={{ color: "white" }}
                />
                <Bar dataKey="completion" radius={[5, 5, 0, 0]}>
                  {habits.map((habit, index) => (
                    <Cell key={`cell-${index}`} fill={habit.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Streak Analysis
            </h3>
            <div className="flex items-center justify-center h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={STREAK_DATA}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="current"
                    nameKey="habit"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {STREAK_DATA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any, props: any) => [
                      `${value} days`,
                      props.payload.habit,
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(23, 23, 70, 0.8)",
                      borderColor: "#9b87f5",
                      borderRadius: "0.5rem",
                    }}
                    labelStyle={{ color: "white" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Current vs. Longest Streaks
            </h3>
            <div className="space-y-4">
              {STREAK_DATA.map((streak, index) => (
                <div key={index}>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{streak.habit}</span>
                    <span>
                      {streak.current} / {streak.longest} days
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(streak.current / streak.longest) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  // Component for the calendar view
  const Calendar = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const currentMonth = today.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    // Generate mock calendar data
    const calendarData: Record<string, Record<number, number>> = {};
    habits.forEach((habit) => {
      calendarData[habit.name.toLowerCase()] = {};
      for (let i = 1; i <= 28; i++) {
        // Random completion value between 0 and 100%
        calendarData[habit.name.toLowerCase()][i] =
          Math.random() > 0.3 ? Math.floor(Math.random() * 100) : 0;
      }
    });

    return (
      <div className="space-y-6">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">{currentMonth}</h3>
            <div className="flex space-x-2">
              <button className="bg-white/10 text-white p-2 rounded hover:bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="bg-white/10 text-white p-2 rounded hover:bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">Habit Completion</span>
            <select
              className="bg-white/10 text-white text-sm py-1 px-2 rounded border border-white/20 focus:outline-none"
              onChange={(e) =>
                setActiveHabit(
                  habits.find((h) => h.id === parseInt(e.target.value)) ||
                    habits[0]
                )
              }
              value={activeHabit.id}
            >
              {habits.map((habit) => (
                <option key={habit.id} value={habit.id} className="bg-gray-800">
                  {habit.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {days.map((day) => (
              <div key={day} className="text-gray-400 text-sm py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month start (example) */}
            {[...Array(0)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="aspect-square bg-white/5 rounded-md"
              ></div>
            ))}

            {/* Calendar days */}
            {[...Array(28)].map((_, i) => {
              const day = i + 1;
              const habitKey = activeHabit.name.toLowerCase();
              const habitData = calendarData[habitKey]?.[day] || 0;
              const completion = habitData;

              // Determine background color based on completion percentage
              let bgColorClass;
              if (completion === 0) bgColorClass = "bg-white/5";
              else if (completion < 50) bgColorClass = "bg-red-500/30";
              else if (completion < 80) bgColorClass = "bg-yellow-500/30";
              else bgColorClass = "bg-green-500/30";

              const isToday = day === today.getDate();

              return (
                <motion.div
                  key={day}
                  className={`aspect-square rounded-md flex flex-col items-center justify-center ${bgColorClass} ${
                    isToday ? "ring-2 ring-purple-500" : ""
                  } hover:bg-white/20 cursor-pointer transition duration-200`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-medium text-white">{day}</span>
                  {completion > 0 && (
                    <span className="text-xs text-white/80">{completion}%</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Monthly Summary</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit, index) => {
              const habitData = calendarData[habit.name.toLowerCase()];
              const daysCompleted = Object.values(habitData).filter(
                (val) => val >= 80
              ).length;
              const completionRate = (daysCompleted / 28) * 100;

              return (
                <div key={habit.id} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: habit.color }}
                    >
                      {getHabitIcon(habit.name)}
                    </div>
                    <h4 className="font-medium text-white">{habit.name}</h4>
                  </div>

                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Completion Rate</span>
                    <span>{completionRate.toFixed(0)}%</span>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${completionRate}%`,
                        backgroundColor: habit.color,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-white text-sm">
                    <span>{daysCompleted} days completed</span>
                    <span>{28 - daysCompleted} days missed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  };

  // Component for the Settings Modal
  const SettingsModal = () => {
    const [activeTab, setActiveTab] = useState("general");

    return (
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-gradient-to-br from-[#181035] to-[#2d1b5a] rounded-xl shadow-2xl z-50 border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex border-b border-white/10 mb-5">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`pb-2 px-4 text-sm font-medium ${
                    activeTab === "general"
                      ? "text-purple-500 border-b-2 border-purple-500"
                      : "text-gray-400"
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`pb-2 px-4 text-sm font-medium ${
                    activeTab === "notifications"
                      ? "text-purple-500 border-b-2 border-purple-500"
                      : "text-gray-400"
                  }`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab("account")}
                  className={`pb-2 px-4 text-sm font-medium ${
                    activeTab === "account"
                      ? "text-purple-500 border-b-2 border-purple-500"
                      : "text-gray-400"
                  }`}
                >
                  Account
                </button>
              </div>

              {activeTab === "general" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Time Zone
                    </label>
                    <select className="bg-white/10 text-white w-full py-2 px-3 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option className="bg-gray-800">
                        UTC (Coordinated Universal Time)
                      </option>
                      <option className="bg-gray-800">
                        America/New_York (Eastern Time)
                      </option>
                      <option className="bg-gray-800">
                        America/Chicago (Central Time)
                      </option>
                      <option className="bg-gray-800">
                        America/Los_Angeles (Pacific Time)
                      </option>
                      <option className="bg-gray-800">
                        Europe/London (GMT)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Week Starts On
                    </label>
                    <select className="bg-white/10 text-white w-full py-2 px-3 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option className="bg-gray-800">Monday</option>
                      <option className="bg-gray-800">Sunday</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">
                      Dark Mode
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">
                      Daily Reminders
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Reminder Time
                    </label>
                    <input
                      type="time"
                      defaultValue="19:30"
                      className="bg-white/10 text-white w-full py-2 px-3 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">
                      Weekly Report
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="User avatar"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-white">Emma Roberts</h4>
                      <p className="text-sm text-gray-400">emma@example.com</p>
                      <button className="text-xs text-purple-400 mt-1">
                        Change profile picture
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  // Component for the Add Habit Modal
  // const AddHabitModal = () => {
  //   const colorOptions = [
  //     "#9b87f5",
  //     "#64b5f6",
  //     "#ff7043",
  //     "#81c784",
  //     "#ba68c8",
  //     "#4fc3f7",
  //     "#ffb74d",
  //   ];
  //   const unitOptions = [
  //     "minutes",
  //     "hours",
  //     "glasses",
  //     "pages",
  //     "steps",
  //     "calories",
  //   ];

  //   return (
  //     <AnimatePresence>
  //       {showAddHabit && (
  //         <AnimatePresence>
  //           <motion.div
  //             key="backdrop"
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             exit={{ opacity: 0 }}
  //             onClick={() => setShowAddHabit(false)}
  //             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
  //           />

  //           <motion.div
  //             key="modal"
  //             initial={{ opacity: 0, y: 50, scale: 0.9 }}
  //             animate={{ opacity: 1, y: 0, scale: 1 }}
  //             exit={{ opacity: 0, y: 50, scale: 0.9 }}
  //             transition={{ type: "spring", damping: 20 }}
  //             className="fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-gradient-to-br from-[#181035] to-[#2d1b5a] rounded-xl shadow-2xl z-50 border border-white/10"
  //           >
  //             <div className="flex justify-between items-center mb-6">
  //               <h2 className="text-xl font-bold text-white">Add New Habit</h2>
  //               <button
  //                 onClick={() => setShowAddHabit(false)}
  //                 className="text-gray-400 hover:text-white"
  //               >
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   className="h-6 w-6"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   stroke="currentColor"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth={2}
  //                     d="M6 18L18 6M6 6l12 12"
  //                   />
  //                 </svg>
  //               </button>
  //             </div>

  //             <div className="space-y-4">
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-300 mb-1">
  //                   Habit Name
  //                 </label>
  //                 <input
  //                   type="text"
  //                   placeholder="e.g., Drink Water"
  //                   value={newHabit.name}
  //                   onChange={(e) =>
  //                     setNewHabit({ ...newHabit, name: e.target.value })
  //                   }
  //                   className="bg-white/10 text-white w-full py-2 px-3 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
  //                 />
  //               </div>

  //               <div className="grid grid-cols-2 gap-4">
  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-300 mb-1">
  //                     Target
  //                   </label>
  //                   <input
  //                     type="number"
  //                     placeholder="8"
  //                     value={newHabit.target || ""}
  //                     onChange={(e) =>
  //                       setNewHabit({
  //                         ...newHabit,
  //                         target: parseInt(e.target.value) || 0,
  //                       })
  //                     }
  //                     className="bg-white/10 text-white w-full py-2 px-3 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-300 mb-1">
  //                     Unit
  //                   </label>
  //                   <select
  //                     value={newHabit.unit}
  //                     onChange={(e) =>
  //                       setNewHabit({ ...newHabit, unit: e.target.value })
  //                     }
  //                     className="bg-white/10 text-white w-full py-2 px-3 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
  //                   >
  //                     <option value="" className="bg-gray-800">
  //                       Select a unit
  //                     </option>
  //                     {unitOptions.map((unit) => (
  //                       <option key={unit} value={unit} className="bg-gray-800">
  //                         {unit}
  //                       </option>
  //                     ))}
  //                   </select>
  //                 </div>
  //               </div>

  //               <div>
  //                 <label className="block text-sm font-medium text-gray-300 mb-2">
  //                   Color
  //                 </label>
  //                 <div className="flex flex-wrap gap-2">
  //                   {colorOptions.map((color) => (
  //                     <button
  //                       key={color}
  //                       onClick={() => setNewHabit({ ...newHabit, color })}
  //                       className={`w-8 h-8 rounded-full ${
  //                         newHabit.color === color
  //                           ? "ring-2 ring-white ring-offset-1 ring-offset-[#181035]"
  //                           : ""
  //                       }`}
  //                       style={{ backgroundColor: color }}
  //                     />
  //                   ))}
  //                 </div>
  //               </div>

  //               <div className="pt-4">
  //                 <button
  //                   onClick={handleAddHabit}
  //                   disabled={
  //                     !newHabit.name || !newHabit.target || !newHabit.unit
  //                   }
  //                   className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded font-medium transition ${
  //                     !newHabit.name || !newHabit.target || !newHabit.unit
  //                       ? "opacity-50 cursor-not-allowed"
  //                       : "hover:opacity-90"
  //                   }`}
  //                 >
  //                   Add Habit
  //                 </button>
  //               </div>
  //             </div>
  //           </motion.div>
  //         </AnimatePresence>
  //       )}
  //     </AnimatePresence>
  //   );
  // };

  const AddHabitModal = () => {
    const colorOptions = [
      "#9b87f5",
      "#64b5f6",
      "#ff7043",
      "#81c784",
      "#ba68c8",
      "#4fc3f7",
      "#ffb74d",
    ];
    const unitOptions = [
      "minutes",
      "hours",
      "glasses",
      "pages",
      "steps",
      "calories",
    ];

    return (
      <AnimatePresence mode="wait">
        {showAddHabit && (
          <>
            <div
              key="backdrop"
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              onClick={() => setShowAddHabit(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              key="modal"
              // initial={{ opacity: 0, y: 50, scale: 0.9 }}
              // animate={{ opacity: 1, y: 0, scale: 1 }}
              // exit={{ opacity: 0, y: 50, scale: 0.9 }}
              // transition={{ type: "spring", damping: 20 }}
              className="fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-gradient-to-br from-[#181035] to-[#2d1b5a] rounded-xl shadow-2xl z-50 border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Add New Habit</h2>
                <button
                  onClick={() => setShowAddHabit(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Habit Name
                  </label>
                  <motion.input
                    type="text"
                    placeholder="e.g., Drink Water"
                    value={newHabit.name}
                    onChange={(e) =>
                      setNewHabit({ ...newHabit, name: e.target.value })
                    }
                    className="bg-white/10 text-white w-full py-2 px-3 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Target
                    </label>
                    <input
                      type="number"
                      placeholder="8"
                      value={newHabit.target || ""}
                      onChange={(e) =>
                        setNewHabit({
                          ...newHabit,
                          target: parseInt(e.target.value) || 0,
                        })
                      }
                      className="bg-white/10 text-white w-full py-2 px-3 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Unit
                    </label>
                    <select
                      value={newHabit.unit}
                      onChange={(e) =>
                        setNewHabit({ ...newHabit, unit: e.target.value })
                      }
                      className="bg-white/10 text-white w-full py-2 px-3 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="" className="bg-gray-800">
                        Select a unit
                      </option>
                      {unitOptions.map((unit) => (
                        <option key={unit} value={unit} className="bg-gray-800">
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewHabit({ ...newHabit, color })}
                        className={`w-8 h-8 rounded-full ${
                          newHabit.color === color
                            ? "ring-2 ring-white ring-offset-1 ring-offset-[#181035]"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleAddHabit}
                    disabled={
                      !newHabit.name || !newHabit.target || !newHabit.unit
                    }
                    className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded font-medium transition ${
                      !newHabit.name || !newHabit.target || !newHabit.unit
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-90"
                    }`}
                  >
                    Add Habit
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };
  // Footer component
  const Footer = () => {
    return (
      <motion.footer
        className="text-center py-6 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>© 2025 Personal Tracker by Uday. All rights reserved.</p>
      </motion.footer>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-[#181035] text-white overflow-x-hidden">
      <FloatingElements />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Navbar />

        <main className="py-6">
          {currentView === "dashboard" && <Dashboard />}
          {currentView === "stats" && <Statistics />}
          {currentView === "calendar" && <Calendar />}
        </main>

        <Footer />
      </div>

      <AddHabitModal />
      <SettingsModal />
    </div>
  );
};

export default Index;
