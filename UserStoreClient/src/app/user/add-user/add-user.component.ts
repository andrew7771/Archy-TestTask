import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  sub: Subscription;
  user: User;
  isEditMode = false;
  pageTitle = 'Create User';
  floatLabelControl = new FormControl('auto');

  constructor(private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['']
    });

    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getUser(id);
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUser(id: number) {
    if (id && id !== 0) {
      this.userService.getUserById(id).subscribe(user => {
        if (this.userForm) {
          this.userForm.reset();
        }
        this.isEditMode = true;
        
        this.user = user;
        this.pageTitle = `Edit User : ${this.user.firstName + this.user.lastName}`;

        this.userForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          birthDate: this.user.birthDate
        })
      });
    }
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
      let usr = this.user;  
      if (this.isEditMode) {
          usr = {...this.user, ...this.userForm.value};
          if (usr.id && usr.id !== 0) {
            this.userService.updateUser(usr)
            .subscribe({
              next: () => this.onSaveComplete(),
            });
          }
        } else {
          this.userService.addUser(this.userForm.value)
          .subscribe({
            next: () => this.onSaveComplete(),
          });
        }        
    }
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
