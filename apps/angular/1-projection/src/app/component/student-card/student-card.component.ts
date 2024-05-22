import { Component, OnInit, WritableSignal } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemRefDirective } from '../../ui/list-item/list-item-ref.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" (add)="addStudent()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template listItemRef let-item>
        <app-list-item (delete)="deleteStudent(item.id)">
          {{ item.firstName }} {{ item.lastName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      app-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
})
export class StudentCardComponent implements OnInit {
  students: WritableSignal<Student[]> = this.store.students;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }

  addStudent() {
    this.store.addOne(randStudent());
  }
}
