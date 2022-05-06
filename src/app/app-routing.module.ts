import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FillDataComponent } from "./components/fill-data/fill-data.component";
import { AuthGuard } from "./guards/auth/auth.guard";
import { MdiComponent } from "./icons/mdi/mdi.component";
import { PageLayoutComponent } from "./layout/page-layout/page-layout.component";
import { Dashboard2Component } from "./pages/dashboard-2/dashboard-2.component";

const routes: Routes = [
  // { path: 'fill-data/:type', component: FillDataComponent },
  {
    path: '',
    component: PageLayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'icon',
    component: MdiComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
