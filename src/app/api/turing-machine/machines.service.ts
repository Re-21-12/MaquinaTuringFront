import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  TransicionAutomata,
  TuringMachine,
} from '../../shared/Models/turingMachineModels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MachinesService {
  private http = inject(HttpClient);
  private readonly aoiUrlTuringMachine =
    'https://localhost:7044/api/TuringMachines';
  private readonly aoiUrlTransitions =
    'https://localhost:7044/api/TransicionesAutomatums';

  createTuringMachine(turingMachine: TuringMachine): Observable<TuringMachine> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<TuringMachine>(
      this.aoiUrlTuringMachine,
      turingMachine,
      {
        headers,
      }
    );
  }
  getTuringMachine(id:any): Observable<TuringMachine> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = `${this.aoiUrlTuringMachine}/${id}`;
    return this.http.get<TuringMachine>(url, {
      headers,
    });
  }
  getTuringMachines(): Observable<TuringMachine[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<TuringMachine[]>(this.aoiUrlTuringMachine, {
      headers,
    });
  }

  createTransicionAutomata(
    transicion: TransicionAutomata
  ): Observable<TransicionAutomata> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<TransicionAutomata>(
      this.aoiUrlTransitions,
      transicion,
      { headers }
    );
  }
}
