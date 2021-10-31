import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-crest',
  templateUrl: './team-crest.component.html',
  styleUrls: ['./team-crest.component.css']
})
export class TeamCrestComponent implements OnInit {
  @Input() teamData :any

  constructor() { }

  ngOnInit(): void {
  }

}
