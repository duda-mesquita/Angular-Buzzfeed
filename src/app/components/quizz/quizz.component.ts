import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  finalImage:string = ""

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers) //pede pra calcular
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      //força ele a entender que finalAnswer é uma chave do mesmo tipo que quizz_question.results.
      //Caso contrário ele não aceita pois foi declarado antes como tipo string
      if (this.answerSelected === "Você muito provavelmente seria um super Vilão!") {
        this.finalImage = "https://sm.ign.com/ign_br/screenshot/default/coringa-cla-ssico-cke_x1a7.jpg"
      } else {
        this.finalImage = "https://observatoriodocinema.uol.com.br/wp-content/uploads/2019/08/cropped-Batman-3-5.jpg"
      }
    }
  }
//Abaixo o algoritmo para identificar o item que mais aparece dentro do vetor
  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
        ){
        return previous
      }else{
        return current
      }
    })
    return result
  }




}
