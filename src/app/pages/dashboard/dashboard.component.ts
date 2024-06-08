import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe((x) => console.log(x));

    this.doctorService.getSingleDoctor(1002).subscribe(console.log);
  }
}
