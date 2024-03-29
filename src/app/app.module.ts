import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './content/catalog/catalog.component';
import { ContentComponent } from './content/content.component';
import { ShoppingCartComponent } from './content/shopping-cart/shopping-cart.component';
import { HeaderComponent } from './header/header.component';
import { UserManagerComponent } from './header/user-manager/user-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    UserManagerComponent,
    CatalogComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
