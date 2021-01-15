import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from 'src/app/root/service/signalr.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'send-offer',
  templateUrl: '../templates/send-offer.template.html',
  styleUrls: ['../styles/send-offer.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendOfferComponent {
  offerForm: FormGroup;
  constructor(private fb: FormBuilder, private signalr: SignalRService) {
    this.offerForm = this.fb.group({
      title: [
        '',
        [Validators.pattern('^([a-zA-Z0-9_ ]){2,25}$'), Validators.required],
      ],
      message: [
        '',
        [
          Validators.pattern('^([a-zA-z0-9_., $]){5,200}$'),
          Validators.required,
        ],
      ],
    });
  }
  public sendOffer(userName: string, advertiseId: string): void {
    const obj = {
      advertiseId,
      title: this.offerForm.get('title')?.value,
      message: this.offerForm.get('message')?.value,
    };
    this.signalr.invokeOffer(userName, obj);
  }
}
