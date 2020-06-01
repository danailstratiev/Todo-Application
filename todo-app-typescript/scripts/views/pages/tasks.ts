import {createNewTask, loadTasks, taskLoader, deleteTask} from '../../controllers/taskController'


export default function tasks(listId) {
    return {
        template:`
        <div class="task-container">
        <div class="task-wrapper">
            <section class="task-manager">
                <header>
                    <h2>TODO Tasks Manager</h2>
                </header>
               
            </section>
            <section class="task-viewer" id="task-visualizer">
                            
            </section>
        </div>
        <div class="task-creator">
            <header>
                <h2>Add/Edit Task</h2>
            </header>
            <section class="task-form">
                <form>
                    <section class="task-input">
                        <section class="task-heading">
                        <label for="taskTitle">
                            Title
                        </label>
                        <input type="text" name="taskTitle" id="taskTitle">
                        <p>Default state</p>
                        </section>
                        <section>
                        <label for="description">Description</label>
                        <textarea name="taskDescrpition" id="taskDescrpition" cols="30" rows="5"></textarea>
                        <p>Default state</p>
                        </section>
                        <input type="hidden" id="taskId">
                        <section class="task-checker">
                            <div>
                            <p>
                            <input type="checkbox" id="myCheck" onclick="">
                            </p>
                            <p>Checked</p>
                            </div>
                        </section>
                        <section class="task-create-btn">
                            <button id="createEditTask">Create/Edit Task</button>
                        </section>
                    </section>
                </form>
            </section>
        </div>
    </div>
        `,
        listeners: [
            {
              targetId: 'createEditTask',
              eventType: 'click',
              callback: () => createNewTask(listId)
            },{
                targetId: 'allTasks',
                eventType: 'click',
                callback: () => taskLoader(listId)
            }
          ]
    };
}