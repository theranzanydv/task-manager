const Task = require('../models/Tasks')

const asyncWrapper = require('../middlewares/async')
const { createCustomError } = require('../errors/custom-error')

// ! get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({})
	res.status(200).json({ tasks: tasks })
})

// ! create Task
const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body)
	res.status(201).json({ task })
})

// ! get Single Task
const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params
	// const task = await Task.findById(taskID)
	const task = await Task.findOne({ _id: taskID })
	if (!task) {
		return next(createCustomError(`Task not found of ID: ${taskID}`, 404))
	}
	res.status(200).json({ task })
})

// ! delete a task
const deleteTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params
	const task = await Task.findOneAndDelete({ _id: taskID })
	if (!task) {
		return next(createCustomError(`Task not found of ID: ${taskID}`, 404))
	}
	res.status(200).json({ task })
})

// ! update a task
const updateTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params
	const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	})
	if (!task) {
		return next(createCustomError(`Task not found of ID: ${taskID}`, 404))
	}
	res.status(200).json({ task })
})

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
}
