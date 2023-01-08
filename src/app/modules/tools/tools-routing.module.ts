import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RawtovalComponent } from './components/rawtoval/rawtoval.component';
import { ValtorawComponent } from './components/valtoraw/valtoraw.component';
import { ToolsComponent } from './tools.component';

const routes: Routes = [
  {path: "", component: ToolsComponent, children: [
    {path: "valtoraw", component: ValtorawComponent},
    {path: "rawtoval", component: RawtovalComponent},
    {path: "**", redirectTo: "valtoraw"}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
