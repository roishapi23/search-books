import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBooksComponent } from './components/search-books/search-books.component';
import { LayoutComponent } from './components/layout/layout.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'search',
        component: SearchBooksComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: '',
        redirectTo: '/search', pathMatch: 'full'
      },
    ],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: '**',
    redirectTo: '/welcome', pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
