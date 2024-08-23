const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete });
        await newTask.save();
        res.status(200).json({status: 'success', data: newTask})
    } catch (error) {
        res.status(400).json({status: 'fail', error: error})
    }
}

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({});
        res.status(200).json({status: 'success', data: taskList})
    } catch (error) {
        res.status(400).json({status: 'fail', error: error})
    }
}

taskController.deleteTask = async (req, res) => {
    try {
        const deleteItem = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({status: 'ok', data: deleteItem })
    } catch (error) {
        res.status(400).json({statue: 'fail', error: error})
    }
}

taskController.updateTask = async (req, res) => {
    try {
        
        const taskId = req.params.id;
        // 먼저 해당 ID의 작업을 가져옴
        const task = await Task.findById(taskId);

        if(!task) {
            return res.status(404).json({ status: 'fail', error: 'Task not found' });
        }

        // isComplete의 상태를 토글
        task.isComplete = !task.isComplete;

        // 업데이트 후 결과를 반환
        const updatedTask = await task.save(); // save() 메서드를 사용하여 업데이트

        res.status(200).json({status: 'ok', data: updatedTask })
    } catch (error) {
        res.status(400).json({statue: 'fail', error: error})
    }
}

module.exports = taskController;