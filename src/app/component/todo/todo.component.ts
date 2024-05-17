
import { Component, ElementRef, Input, Renderer2} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  constructor(private el:ElementRef, private renderer:Renderer2) {

  }
onImageClick() {
  this.renderer.setStyle(this.el.nativeElement.querySelector('img'), 'text-decoration', 'line-through');
}

todoValue:string = '';
todoDescription: string = '';

todoList :Todo[]=[

];

finishedList:Todo[]=[];
inputTouched:boolean = false;

onInputFocus(): void {
  this.inputTouched = true;
  if (this.todoValue == '') {
    this.renderer.addClass(this.el.nativeElement.querySelector('input'), 'input-error');
  } else {
    this.renderer.removeClass(this.el.nativeElement.querySelector('input'), 'input-error');
  }
}

updateLocalStorage(): void {
  localStorage.setItem('todolist', JSON.stringify(this.todoList));
  localStorage.setItem('finishedlist', JSON.stringify(this.finishedList));
}

ngOnInit():void{


  let storedTodoList = localStorage.getItem('todolist');
  if(this.todoList){
    this.todoList=JSON.parse(storedTodoList);
  }

  const storedFinishedList = localStorage.getItem("finishedlist");
  if (storedFinishedList) {
    this.finishedList = JSON.parse(storedFinishedList);
  }
}


Submit(){
  if(this.todoValue =='') return;
  this.todoList.push({content:this.todoValue,value:false,desc:this.todoDescription || 'No Description'});
  this.todoValue = '';
  this.todoDescription = '';
  localStorage.setItem("todolist",JSON.stringify(this.todoList));

}

changeTodo(i:number){
  const item = this.todoList.splice(i,1);
  this.finishedList.push(item[0]);
  this.updateLocalStorage();


}

changedFinsihed(i:number){
  const item = this.finishedList.splice(i,1);
  this.todoList.push(item[0])
  this.updateLocalStorage();



}

delete(i: number ,value:String) {
  console.log(i, value);

  alert("Are you sure u want to delete it");
  if(value == 'todolist'){
    this.todoList.splice(i,1);
    localStorage.setItem("todolist",JSON.stringify(this.todoList));
  }else{
    this.finishedList.splice(i,1);
    localStorage.setItem("finishedlist",JSON.stringify(this.finishedList));
  }

}

}



interface Todo
{
  content:String;
  value:Boolean;
  desc:string;
}
