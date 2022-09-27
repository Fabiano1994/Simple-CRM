import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/assets/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user = new User();
  userId: string;
  loading = false;
  birthDate: Date; 

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditUserComponent>, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  saveUser() {
    console.log('Current user:', this.user);
    this.loading = true;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update(this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
  }


}
