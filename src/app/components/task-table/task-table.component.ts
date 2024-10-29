import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { Task } from '../../model/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatCheckboxModule, FormsModule],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})

export class TaskTableComponent implements OnInit {

  tasks: Task[] = [];
  dataSource: Task[] = [];
  displayedColumns = [
    'title',
    'description',
    'completed',

  ];

  private taskService = inject(TaskService)

  ngOnInit(): void {
    this.taskService.getTasks()
      .subscribe({
        next: (mappedTasks) => {
          this.tasks = mappedTasks;
          this.dataSource = this.tasks
          console.log('Tasks received and mapped:', this.tasks);
        },
        error: (error) => {
          console.error('Error fetching tasks:', error);
        },
        complete: () => {
          console.log('Task fetching completed');
        }
      });

  }


  onTaskCompletionChange(task: Task) {
    console.log('Task completion status changed:', task);
    this.taskService.updateTask(task).subscribe({
      next: (updatedTask) => {
        console.log('Task updated successfully:', updatedTask);
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }


}



