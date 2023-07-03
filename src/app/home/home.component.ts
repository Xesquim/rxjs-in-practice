import { Component, OnInit } from "@angular/core";
import { Observable, noop } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { createHttpObservable } from "../common/util";
import { Course } from "../model/course";
@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public beginnersCourses$: Observable<Course[]>;

  public advancedCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");

    const courses$: Observable<Course[]> = http$.pipe(
      map((res) => res["payload"]),
      shareReplay()
    );

    this.beginnersCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "BEGINNER")
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "ADVANCED")
      )
    );
  }
}
