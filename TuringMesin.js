Genap = [
  {ruleNow:'a', input:'1', ruleNext:'b', replace:'1', move:'>', status:'-'},
  {ruleNow:'a', input:'_', ruleNext:'c', replace:'_', move:'>', status:'-'},

  {ruleNow:'b', input:'1', ruleNext:'a', replace:'1', move:'>', status:'-'},

  {ruleNow:'c', input:'_', ruleNext:'c', replace:'_', move:'>', status:'Accept'}
]
PangkatN = [
  {ruleNow:'a', input:'0', ruleNext:'b', replace:'x', move:'>', status:'-'},
  {ruleNow:'a', input:'y', ruleNext:'d', replace:'y', move:'>', status:'-'},
  {ruleNow:'a', input:'_', ruleNext:'e', replace:'_', move:'>', status:'-'},

  {ruleNow:'b', input:'0', ruleNext:'b', replace:'0', move:'>', status:'-'},
  {ruleNow:'b', input:'1', ruleNext:'c', replace:'y', move:'<', status:'-'},
  {ruleNow:'b', input:'y', ruleNext:'b', replace:'y', move:'>', status:'-'},

  {ruleNow:'c', input:'0', ruleNext:'c', replace:'0', move:'<', status:'-'},
  {ruleNow:'c', input:'x', ruleNext:'a', replace:'x', move:'>', status:'-'},
  {ruleNow:'c', input:'y', ruleNext:'c', replace:'y', move:'<', status:'-'},

  {ruleNow:'d', input:'y', ruleNext:'a', replace:'y', move:'>', status:'-'},
  {ruleNow:'d', input:'_', ruleNext:'e', replace:'_', move:'>', status:'-'},

  {ruleNow:'e', input:'_', ruleNext:'-', replace:'_', move:'-', status:'Accept'}
]

class TM{
  constructor(input, Rule, start){
    this.transition = Rule;//menyimpan aturan transition
    this.tape = "_"+input+"__";// tape pada mesin turing
    this.pointer = 1;// Pointer pada mesin turing
    this.status = '-';// Accept/Reject
    this.ruleNow = start;// rule yang sedang digunakan
    this.tahapan = [];// menyimpan tahapan
  }

  findRule(rule, input){
    let i = 0;
    let find = -1;
    while (i < this.transition.length && find == -1) {
      if(this.transition[i].ruleNow == rule && this.transition[i].input == input){
        find = i;
      }
      i++;
    }

    return find;
  }

  process(id){

    if(id != -1){
      this.tahapan.push(this.tape.slice(0, this.pointer) + this.transition[id].ruleNow + this.tape.slice(this.pointer))
      
      this.tape = this.tape.slice(0, this.pointer) + this.transition[id].replace + this.tape.slice(this.pointer + 1);
      this.ruleNow = this.transition[id].ruleNext;
      if(this.transition[id].move == '>'){
        this.pointer++;
      }else if(this.transition[id].move == '<'){
        this.pointer--;
      }else{

      }
      this.status = this.transition[id].status;
    }else{
      this.status = "Reject";
    }
  }

  run(){
    this.tahapan = [];
    while (this.status == '-') {
      let id = this.findRule(this.ruleNow, this.tape.charAt(this.pointer));
      this.process(id);
    }
  }
}

var Run = function(id){
  switch (id) {
    case 1:
    var input = document.getElementById('input').value;
    var output = document.getElementById('output');
    var tahapan = document.getElementById('tahapan');
    var rule = Genap;
    break;
    case 2:
    var input = document.getElementById('input2').value;
    var output = document.getElementById('output2');
    var tahapan = document.getElementById('tahapan2');
    var rule = PangkatN;
      break;
    default:
  }

  let A = new TM(input, rule, 'a');
  A.run();
  output.innerHTML = A.status;
  tahapan.innerHTML = "";
  console.log(A.tahapan);
  for(let i = 0; i < A.tahapan.length; i++){
    tahapan.innerHTML += "<td>" + A.tahapan[i] + "</td><br>";
  }
}
