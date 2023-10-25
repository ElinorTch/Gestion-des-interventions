import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  //Apparitions au defilement
  apparition() {
    const ratio = .1
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: ratio,
    }

    const handleIntersect = function (entries: any[], observer: { unobserve: (arg0: any) => void; }) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > ratio) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, options)
    document.querySelectorAll('.reveal').forEach(function (s) {
      observer.observe(s)
    })
    document.querySelectorAll('[class*="reveal-"]').forEach(function (r) {
      observer.observe(r)
    })
  }

  ngOnInit(): void {
    this.apparition()
  }
}
