  "use client";

  import React, { useState } from "react";
  import CalendarDropdown from "./components/CalendarDropdown";

  export default function Home() {
    const [showAddModal, setShowAddModal] = useState(false);
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

      // Function to archive (delete) a task
    const handleArchiveTask = () => {
      setTasks(tasks.filter(task => task !== selectedTask));
      setShowViewModal(false); 
      setSelectedTask(null);
    };

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
      <p className="text-xs mb-4 italic text-gray-600">Lorem ipsum odor amet</p>
      <div className="bg-white shadow-md rounded-md p-4 border border-gray-300 max-w-md">
        <button className="bg-red-800 text-white text-xs px-4 h-8 rounded-md mb-3" onClick={handleAddTask}>
          Add Task
        </button>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={index}
              className="p-3 border border-gray-200 rounded-md mb-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleViewTask(task)}
            >
              <h2 className="text-sm font-bold mb-2">{task.title}</h2>
              <p className="text-xs">People: {task.people}</p>
              <p className="text-xs">Due Date: {task.deadline ? task.deadline.toLocaleDateString() : "No deadline set"}</p>
              <p className="text-xs">Task: {task.task}</p>
              <p className="text-xs italic text-gray-600">Task Description: {task.description}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500 mt-4">No task added yet.</p>
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
                <div className="mb-2">
                  <CalendarDropdown selectedDate={taskData.deadline} setSelectedDate={(date) => setTaskData({ ...taskData, deadline: date })} />
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
            <p className="font-semibold text-sm">View Task</p>
            <div className="mt-4">
              <h2 className="text-sm font-bold mb-2">{selectedTask.title}</h2>
              <p className="text-xs">People: {selectedTask.people}</p>
              <p className="text-xs">Due Date: {selectedTask.deadline ? selectedTask.deadline.toLocaleDateString() : "No deadline set"}</p>
              <p className="text-xs">Task: {selectedTask.task}</p>
              <p className="text-xs italic text-gray-600">Description: {selectedTask.description}</p>
            </div>
            <div className="flex justify-between w-full mt-4">
            <button className="mt-4 px-4 h-8 text-xs bg-gray-400 text-white rounded-md" onClick={() => setShowViewModal(false)}>
              Close
            </button>
            <button 
              className="mt-4 px-4 h-8 text-xs bg-red-800 text-white rounded-md" 
              onClick={handleEditTask}
            >
              Edit
            </button>
            <button 
            className="mt-4 px-4 h-8 text-xs bg-red-800 text-white rounded-md" 
            onClick={handleArchiveTask}
          >
            Archived
          </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
