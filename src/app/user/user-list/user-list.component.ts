import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'email', 'edit'];

  users$ = this.userService.users$;

  
  constructor(private userService: UserService) { }



  ngOnInit(): void {
  }

}
