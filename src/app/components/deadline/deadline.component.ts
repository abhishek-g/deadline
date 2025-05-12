import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, interval, map, switchMap, takeWhile, tap } from 'rxjs';
import { DeadlineService } from '../../services/deadline.service';

@Component({
  selector: 'app-deadline',
  imports: [NgIf, AsyncPipe],
  template: `<ng-container *ngIf="(secondsLeft$ | async) as secondsLeft">
   <div *ngIf="secondsLeft$ | async as secondsLeft">
  <p *ngIf="secondsLeft > 0; else ended">
    Seconds left to deadline: {{ secondsLeft }}
  </p>
  <ng-template #ended>
    <p>Deadline reached!</p>
  </ng-template>
</div>
  </ng-container>`,
  styleUrl: './deadline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DeadlineComponent {

  secondsLeft$ = new BehaviorSubject<number | null>(null);

  constructor(private deadlineService: DeadlineService) {
    this.initializeCountdown();
  }

  private initializeCountdown(): void {
    this.deadlineService.getDeadline().pipe(
      tap(res => this.secondsLeft$.next(res.secondsLeft)),
      switchMap(res =>
        interval(1000).pipe(
          map(tick => res.secondsLeft - tick - 1),
          takeWhile(seconds => seconds >= 0),
          tap(seconds => this.secondsLeft$.next(seconds))
        )
      )
    ).subscribe();
  }
}
