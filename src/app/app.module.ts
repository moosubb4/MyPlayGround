import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// Component
import { AppComponent } from './app.component';
import { ShowComponent } from './components/show/show.component';
import { CheckSelectComponent } from './components/check-select/check-select.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TestPageComponent } from './components/test-page/test-page.component';
import { TestComponent } from './components/test/test.component';
import { TestOneComponent } from './components/test-one/test-one.component';
import { ImdbPageComponent } from './components/imdb-page/imdb-page.component';
import { Tab1Component } from './components/imdb-page/tab1/tab1.component';
import { Tab2Component } from './components/imdb-page/tab2/tab2.component';
import { Tab3Component } from './components/imdb-page/tab3/tab3.component';
import { Tab4Component } from './components/imdb-page/tab4/tab4.component';
// Service
import { ShowService } from './services/show.service';
import { SearchService } from './services/search.service';
import { PubsubService } from './services/pubsub.service';
import { SpotifyService } from './services/spotify.service';
import { TestPipe } from './pipes/test.pipe';
import { PipeTestComponent } from './components/pipe-test/pipe-test.component';
import { NumcommaPipe } from './pipes/numcomma.pipe';
import { DragulaModule } from 'ng2-dragula';
import { NumberjapDirective } from './directives/numberjap.directive';
import { JpYearsPipe } from './pipes/jp-years.pipe';
import { JapYearsDirective } from './directives/jap-years.directive';
import { DateFormatDirective } from './directives/date-format.directive';
import { Tab4TestComponent } from './components/tab4-test/tab4-test.component';
import { OnlynumberDirective } from './directives/onlynumber.directive';
import { PaginatorsComponent } from './components/paginators/paginators.component';
import { SwitchStarComponent } from './common/switch-star/switch-star.component';
import { KeyenterComponent } from './components/keyenter/keyenter.component';
import { KeyenterDirective } from './directives/keyenter.directive';
import { DatePickersComponent } from './components/calendar/date-pickers/date-pickers.component';
import { EnterkeysDirective } from './directives/enterkeys.directive';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';




const appRoutes: Routes = [
  { path: '', component: TestOneComponent },
  { path: 'test2', component: TestPageComponent },
  { path: 'test3', component: TestComponent },
  { path: 'imdb', component: ImdbPageComponent },
  { path: 'pipe', component: PipeTestComponent },
  { path: 'TestCode', component: Tab4TestComponent },
  { path: 'Keyenter', component: KeyenterComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    CheckSelectComponent,
    UsersTableComponent,
    SearchBarComponent,
    TestPageComponent,
    TestOneComponent,
    TestComponent,
    ImdbPageComponent,
    Tab1Component,
    Tab2Component,
    Tab3Component,
    Tab4Component,
    TestPipe,
    PipeTestComponent,
    NumcommaPipe,
    NumberjapDirective,
    JpYearsPipe,
    JapYearsDirective,
    DateFormatDirective,
    Tab4TestComponent,
    OnlynumberDirective,
    PaginatorsComponent,
    SwitchStarComponent,
    KeyenterComponent,
    KeyenterDirective,
    // CalendarDateComponent,
    // DropdowncalendarComponent,
    DatePickersComponent,
    EnterkeysDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    DragulaModule,
    // BrowserAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule
  ],
  providers: [
    ShowService,
    SearchService,
    PubsubService,
    SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
