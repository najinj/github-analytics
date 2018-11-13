import moment from "moment";
export {HandleData};
export {Timelinedata};

class Counter extends Map {
    constructor(iter, key=null) {
        super();
        this.key = key || (x => x);
        for (let x of iter) {
            this.add(x);
        }
    }
    add(x) {
      x = this.key(x);
      this.set(x, (this.get(x) || 0) + 1);
    }
}
function HandleData(commits){

  let login_names = [];
  var counts = {};
  var data = [];
  if(commits.length){
    commits.map(commit=>{
      if(commit.author!=null && commit.author.hasOwnProperty('login'))
          login_names.push(commit.author.login);
      else {
        login_names.push("unknown");
      }
    });
    login_names.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    let results = new Counter(login_names);
    for (let [number, times] of results.entries()){

      data.push({
        id:number,
        label:number,
        value:times,
        color: "hsl("+Math.floor(Math.random() * 200) + 1+", 70%, 50%)"
      })
    }

    return data;
  }
}

function Timelinedata(commits){
  var data = [];
  let data_temp = [];
  var counts = {};
  if(commits.length){
    commits.map(commit=>{
        data_temp.push(
          moment(commit.commit.author.date).format("YYYY-MM-DD")
        );

    });
    data_temp.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    let results = new Counter(data_temp);
    for (let [number, times] of results.entries()){
      data.push({
        date:number,
        commit:times,
      })
    }
    return data;
  }
}
