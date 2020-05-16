import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  floatLabelControl = new FormControl('auto');

  constructor(private fb: FormBuilder,
      private router: Router,
      private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['']
    });
  }

  populateTestData() {
    this.userForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com' ,
      birthDate: new Date(1999,8,8)    
    });
  }

  save() {
    if (this.userForm.valid) {
        this.userService.addUser(this.userForm.value)
          .subscribe({
            next: () => this.onSaveComplete(),
          });
    }
    
    
    //this.userService.updateUser(this.userForm.value);
  }

  getErrorMessage() {
    if (this.userForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
  }

  onSaveComplete() {
    this.userForm.reset();
    this.router.navigate(['/users']);
  }
}
