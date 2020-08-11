import { Component, OnInit } from "@angular/core";
import { Tweet } from "../tweet";
import { TweetsService } from "../tweets.service";

import {
  faHeart,
  faComment,
  faRetweet,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { empty } from "rxjs";

@Component({
  selector: "app-tweets",
  templateUrl: "./tweets.component.html",
  styleUrls: ["./tweets.component.css"],
})
export class TweetsComponent implements OnInit {
  faHeart = faHeart;
  faComment = faComment;
  faRetweet = faRetweet;
  faShare = faShare;

  twat: Tweet[];
  constructor(tService: TweetsService) {
    this.twat = tService.tweets;
    console.log(this.twat.length);
  }

  filteredTweets: Tweet[];

  currentSearch: string = null;

  public handleSearchKeyUp(event: any) {
    let searchTerm: string = event.target.value;

    // Reset filtered array to original state from this.twat
    this.filteredTweets = Array.from(this.twat);

    if (searchTerm && searchTerm !== "") {
      
      this.filteredTweets = Array.from(this.filteredTweets.filter((value, index) => {
        return value.text.toLowerCase().includes(searchTerm.toLowerCase());
      }));

      this.filteredTweets.forEach((value, index) => {
        //value.text = value.text.replace(searchTerm, "<span class=\"text-danger\">" + searchTerm + "</span>")
        let regex = new RegExp(searchTerm, 'gmi');
        value.text = value.text.replace(regex, "<span class=\"text-danger\">" + searchTerm + "</span>");
        //let regex = new RegExp('/f/gmi');
        //value.text = value.text.replace(regex, 'F');

        //value.text.replace()
        
      });

    }



  }

  public nFormatter(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  ngOnInit() {
    this.filteredTweets = Array.from(this.twat);
  }
}
