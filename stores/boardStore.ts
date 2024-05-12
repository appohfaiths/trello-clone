import { v4 as uuid } from 'uuid';
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from "~/data/board.json"

export const useBoardStore = defineStore('boardStore', () => {
    const board = useStorage('board', boardData)

    // Tasks
    const getTask = computed(() => {
        return (taskId: string) => {
            for (const column of board.value.columns) {
                const task = column.tasks.find(task => task.id === taskId)
                if (task) return task
            }
        }
    })

    function addTask({taskName, columnIndex }: { taskName: string, columnIndex: number}) {
        board.value.columns[columnIndex].tasks.push({
            id: uuid(),
            name: taskName,
            description: ''
        })
    }

    function deleteTask(taskId: string) {
        for (const column of board.value.columns) {
            const taskIndex = column.tasks.findIndex(task => task.id === taskId)

            if (taskIndex !== -1) {
                column.tasks.splice(taskIndex, 1)
                return
            }
        }
    }

    function moveTask({ taskIndex, fromColumnIndex, toColumnIndex} : { taskIndex: number, fromColumnIndex: number, toColumnIndex: number}) {
        const task = board.value.columns[fromColumnIndex].tasks.splice(fromColumnIndex, 1)[0]

        board.value.columns[toColumnIndex].tasks.push(task)
    }

    // Columns
    function addColumn(columnName: string) {
        board.value.columns.push({
            name: columnName,
            id: 'column-' + Date.now(),
            tasks: []
        })
    }

    function deleteColumn(columnIndex: number) {
        board.value.columns.splice(columnIndex, 1)
    }

    return {
        board,
        addColumn,
        deleteColumn,
        getTask,
        addTask,
        deleteTask,
        moveTask
    }
})