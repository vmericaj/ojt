"use client";

import React, { useState } from "react";
import CalendarDropdown from "./components/CalendarDropdown";
import UserList from "./components/UserList";
import sample from "./java/sample";

export default function Home() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [step, setStep] = useState(1);

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskIndex, setTaskIndex] = useState(null); // Track the index of the task being edited

  // Form state for adding a new task
  const [taskData, setTaskData] = useState({
    title: "",
    people: "",
    task: "",
    description: "",
    deadline: null,
    notes: "",
  });
  // Navigate steps in the Add Task modal
  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);
  // Submit new task
  const handleSubmit = () => {
    if (taskIndex !== null) {
      // Update existing task
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = taskData;
      setTasks(updatedTasks);
    } else {
      // Add new task
      setTasks([...tasks, taskData]);
    }
    // Reset form
    setTaskData({ title: "", people: "", task: "", description: "", deadline: null });
    setTaskIndex(null); // Reset task index
    setShowAddModal(false);
    setStep(1);
  };
  
  // Open Add Task modal
  const handleAddTask = () => {
    setShowAddModal(true);
    setShowViewModal(false);
  };

  // Open View Task modal
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowViewModal(true);
    setShowAddModal(false);
  };

    // Function to archive a task
  const handleArchiveTask = () => {
    setTasks(tasks.filter(task => task !== selectedTask));
    setShowViewModal(false); 
    setSelectedTask(null);
  };
    // Function to edit a task
  const handleEditTask = () => {
    if (selectedTask) {
      setTaskData(selectedTask);
      setTaskIndex(tasks.findIndex(task => task === selectedTask)); // Get task index
      setShowAddModal(true);
      setShowViewModal(false);
      setStep(1);
    }
  };
return (
  <div className="min-h-screen p-8 pb-20 sm:p-20">
    <h1 className="text-sm font-semibold">TODAY'S TASK</h1>
    <p className="text-xs mb-4 italic text-gray-600">Et harum quidem rerum facilis est et expedita</p>      
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-4">
        <button className="text-sm font-semibold">All</button>
        <span className="text-xs text-gray-400">|</span>
        <button className="text-xs text-blue-800">New</button>
        <button className="text-xs text-green-800">Done</button>
        <button className="text-xs text-orange-600">In progress</button>
        <button className="text-xs text-red-600">Archived</button>

      </div>
      <button 
        className="bg-red-800 text-white text-xs px-3 h-6 rounded-md" 
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
    <div className="mt-4 space-y-3">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={() => handleViewTask(task)}
          >
            <div className="flex items-start justify-between w-full">
            <div className="flex flex-col w-full">
              <h2 className="text-sm font-bold">{task.title}</h2>
              <p className="text-xs text-gray-600 mb-2">{task.description}</p>
              <hr className="w-full border-gray-300" />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-600">Due: {task.deadline ? task.deadline.toLocaleDateString() : "No deadline"}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-600">{task.task}</span>
                  <span className={`px-2 py-1 text-xs rounded-md ${task.people ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                    {task.people ? task.people : "No assignee"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
        ))
      ) : (
        <p className="text-xs text-gray-500 text-center">No task added yet.</p>
      )}
    </div>
    {/* Add Task Modal */}
    {showAddModal && (
      <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-30">
        <div className="bg-[#ffffff] p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col justify-center items-center">
          <p className="font-semibold text-sm">Add Task</p>
          <p className="text-xs mb-4">Step {step} of 3</p>
          {/* Modal Steps */}
          {step === 1 && (
            <div className="mb-2 w-full">
              <label className="block text-xs font-semibold">TITLE</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                className="mt-2 p-2 text-xs italic border border-gray-300 rounded-md w-full"
              />
            </div>
          )}
          {step === 2 && (
            <div className="w-full">
              <label className="block text-xs font-semibold">People</label>
              <input
                type="text"
                placeholder="Enter people involved"
                value={taskData.people}
                onChange={(e) => setTaskData({ ...taskData, people: e.target.value })}
                className="mt-2 p-2 text-xs italic border border-gray-300 rounded-md w-full"
              />
            </div>
          )}
          {step === 3 && (
            <div className="w-full">
              <div className="mb-2">
                <label className="block text-xs font-semibold">Task</label>
                <select
                  className="mt-2 p-2 text-xs italic border border-gray-300 rounded-md w-full"
                  value={taskData.task}
                  onChange={(e) => setTaskData({ ...taskData, task: e.target.value })}
                >
                  <option value="" disabled>Select a task</option>
                  <option value="Code Review">Code Review</option>
                  <option value="UI Design">UI Design</option>
                  <option value="Testing">Testing</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-xs font-semibold">Task Description</label>
                <textarea
                  placeholder="Enter task description"
                  value={taskData.description}
                  onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  className="mt-2 p-2 text-xs italic border border-gray-300 rounded-md w-full h-24 resize-none"
                />
              </div>
              <div className="mb-2 w-full">
              <CalendarDropdown 
                selectedDate={taskData.deadline} 
                setSelectedDate={(date) => setTaskData({ ...taskData, deadline: date })} 
              />
              </div>
            </div>
          )}
          {/* Modal Buttons */}
          <div className="flex justify-between w-full mt-4">
            <button className="px-4 h-8 text-xs bg-gray-400 text-white rounded-md" onClick={() => setShowAddModal(false)}>
              Close
            </button>
            {step < 3 ? (
              <button className="px-4 h-8 text-xs bg-red-800 text-white rounded-md" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button className="px-4 h-8 text-xs bg-green-600 text-white rounded-md" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    )}
    {/* View Task Modal */}
    {showViewModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-30">
          <div className="bg-[#ffffff] p-8 rounded-lg shadow-lg max-w-md w-full">
            {/* Title */}
            <div className="flex justify-center items-center">
              <p className="text-xs font-semibold">{selectedTask.title}</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-1">
                <p className="text-xs italic bg-blue-100 text-blue-600 px-2 h-4 rounded-md">{selectedTask.task}</p>
                <p className="text-xs italic bg-green-100 text-green-600 px-2 h-4 rounded-md">{selectedTask.people}</p>
                <p className="text-xs italic bg-red-100 text-red-600 px-2 h-4 rounded-md">Deadline: {selectedTask.deadline ? selectedTask.deadline.toLocaleDateString() : "No deadline set"}</p>
              </div>
              <p className="text-xs italic text-gray-600 mt-2">{selectedTask.description}</p>
              {selectedTask.notes && (
                <p className="text-xs italic text-gray-600 mt-1">Notes: {selectedTask.notes}</p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold mb-1">Additional Notes</label>
              <textarea
                className="w-full p-2 text-xs border border-gray-300 rounded-md resize-none"
                placeholder="Enter additional notes..."
                value={selectedTask.notes || ""}
                onChange={(e) => setSelectedTask({ ...selectedTask, notes: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex justify-between w-full mt-4">
              <button 
                className="mt-4 px-3 h-6 text-xs bg-gray-400 text-white rounded-md" 
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
              <div className="flex gap-x-2 mt-4">
                <button 
                  className="px-3 h-6 text-xs bg-red-800 text-white rounded-md" 
                  onClick={handleEditTask}
                >
                  Edit
                </button>
                <button 
                  className="px-3 h-6 text-xs bg-red-800 text-white rounded-md" 
                  onClick={handleArchiveTask}
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

  </div>
);
}
