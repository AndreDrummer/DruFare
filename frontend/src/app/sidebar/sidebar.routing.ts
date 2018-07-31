import { RouterModule, Routes } from '@angular/router';

import { SidebarComponent } from './sidebar.component';
import { NgModule } from '@angular/core';

export const sidebarRoutes: Routes = [
    { path: '', component: SidebarComponent },
];

@NgModule({
    imports: [RouterModule.forChild(sidebarRoutes)],
    exports: [RouterModule]
})

export class SidebarRoutingModule { }
