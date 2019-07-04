import {Component,OnInit,DoCheck} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Message} from '../../../models/message';
import {MessageService} from '../../../services/message.service';
import {GLOBAL} from '../../../services/global';
import {FollowService} from '../../../services/follow.service';
import {Follow} from '../../../models/follow';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';


@Component({

	selector:'add',
	templateUrl:'./add.component.html',
	providers:[FollowService,MessageService]

	})

export class AddComponent implements OnInit{

	public title:string;
	public message:Message;
	public identity;
	public token;
	public url:string;
	public status:string;
	public follows;


	constructor(

		private _route:ActivatedRoute,
		private _router:Router,
		private _followService:FollowService,
		private _messageService:MessageService,
		private _userService:UserService
		){

		this.title='Enviar mensaje';
		
		this.identity=this._userService.getIdentity();
		this.token=this._userService.getToken();
		this.url=GLOBAL.url;
		this.message=new Message('','','','',this.identity._id,'');
	}

	ngOnInit(){

		console.log('add.component cargado!!!');
		this.getMyFollows();
	}

	onSubmit(form){
		console.log("Mensaje:");
		console.log(this.message.text);
		this.message.text=this.replaceURLWithHTMLLinks(this.message.text);
		this._messageService.addMessage(this.token,this.message).subscribe(

			response=>{

				if(response.message){

					this.status='success';
					form.reset();

				}
			},
			error=>{
					this.status='error';
					console.log(<any>error);
			}
			)
	}

	getMyFollows(){
		this._followService.getMyFollows(this.token).subscribe(

			response=>{

					this.follows=response.follows;
				},
				error=>{

					console.log(<any>error);
				}

			);
	}

	replaceURLWithHTMLLinks(text)
    {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(exp,"<a href='$1' target='_blank'>$1 <br> <img src='https://www.youtube.com/watch?v=SMs0GnYze34&list=RDweeI1G46q0o&index=25'></div></a>"); 
    }
}