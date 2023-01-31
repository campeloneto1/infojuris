import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Observable, Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { AudienciasService } from '../audiencias/audiencias.service';
import { Audiencia, Audiencias } from '../audiencias/audiencias';
import { Router } from '@angular/router';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit{
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = false;

  events: CalendarEvent[]  = [];

  constructor(private audienciasService: AudienciasService,
    private router: Router) {}


    ngOnInit(): void {
       
        this.audienciasService.index().subscribe({
            next: (res:Audiencias) => {
                res.map(data => {
                    //@ts-ignore
                    let date = data.data.split('-');
                    //@ts-ignore
                    let hour = data.hora.split(':');
                    //console.log(new Date(date[0], date[1]-1, date[2], hour[0], hour[1], hour[2]));
                    this.events.push({
                        start: startOfDay(new Date(date[0], date[1]-1, date[2], hour[0], hour[1], hour[2])),                       
                        title: `
                        Processo: ${data.processo.codigo}, 
                        Hora: ${data.hora},  
                        Local: ${data.processo.vara.nome} - ${data.processo.vara.comarca.nome} - ${data.processo.vara.comarca.tribunal.nome}`,
                        color: { ...colors['blue'] },
                        //actions: this.actions,
                        id: data.processo_id,
                    })
                })
            },
            error: (error) => {
              
            },
        });
        
    }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action)
    if(action == 'Clicked' ){
        this.router.navigate(['/Processo/', event.id])
    }
  }
 
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


}
