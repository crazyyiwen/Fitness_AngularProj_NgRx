import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService{
	private user: User;
	authChange = new Subject<boolean>();
	
	constructor(private router: Router){

        }
	registerUser(authData: AuthData){
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random()*1000).toString()
		};
		this.authSuccessfully();	
	}
	login(authData: AuthData){
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random()*1000).toString()
		};
		this.authSuccessfully();	
	}
	logout(){
		this.user = null;
		this.authChange.next(false);
		this.router.navigate(['/login']);
	}
	// use destructor to create new return ref object
	getUser(){
		return {...this.user};
	}
	isAuth(){
		return this.user != null;
	}
	authSuccessfully(){
		this.authChange.next(true);
		this.router.navigate(['/training']);
	}
}