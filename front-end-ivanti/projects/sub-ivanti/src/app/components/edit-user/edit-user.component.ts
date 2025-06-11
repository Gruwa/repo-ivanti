import {Component, inject, input, OnInit} from '@angular/core';
import {ReactiveFormsModule, Validators, FormsModule, FormBuilder, FormGroup} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {UserService} from '../../../../../../src/app/shared/services/user.service';
import {filter, map} from 'rxjs';
import {UserInterface} from '../../../../../../src/app/shared/interfaces/user-interface';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'si-edit-user',
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  /**
   * UserService is injected to access user-related methods.
   */
  userService = inject(UserService);

  /**
   * userForm is a FormGroup that holds the form controls for editing user details.
   */
  userForm!: FormGroup;

  id = input.required<string>();

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      nameFormControl: ['', Validators.required],
      emailFormControl: ['', Validators.required],
      userFormControl: ['', Validators.required],
      streetFormControl: ['', Validators.required],
      suiteFormControl: ['', Validators.required],
      cityFormControl: ['', Validators.required],
      zipFormControl: ['', Validators.required],
      latFormControl: ['', Validators.required],
      lngFormControl: ['', Validators.required]
    });

    this.userService.getUsersList({})
      .pipe(
          filter((users: UserInterface[]) => users.length > 0),
        map(m => {
          let value: UserInterface[] = m.filter(f => f.id === +this.id());
          return value[0];
        })
      ).subscribe(s => {
      this.setForm(s);
    });
  }

  /**
   * setForm populates the form controls with the user data.
   * @param data - UserInterface object containing user details.
   */
  setForm(data: UserInterface) {
    this.userForm?.setValue({
      nameFormControl: data.name,
      emailFormControl: data.email,
      userFormControl: data.username,
      streetFormControl: data.address.street,
      suiteFormControl: data.address.suite,
      cityFormControl: data.address.city,
      zipFormControl: data.address.zipcode,
      latFormControl: data.address.geo.lat,
      lngFormControl: data.address.geo.lng
    })
  }

  /**
   * onSubmit handles the form submission, updating the user details.
   */
  onClick() {
    this.router.navigate([this.userService.parentRouter()]);
  }
}
