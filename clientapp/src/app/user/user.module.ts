import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdvertiseFavoriteComponent } from './components/advertise-favorites.component';
import { UserRouting } from './user.routing';

@NgModule({
  declarations: [AdvertiseFavoriteComponent],
  imports: [CommonModule, UserRouting],
})
export class UserModule {}
