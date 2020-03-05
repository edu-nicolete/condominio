import { Routes } from "@angular/router";

import { InicialComponent } from "../pages/inicial/inicial.component";
import { AgendamentoComponent } from "../pages/agendamento/agendamento.component";
import { IconsComponent } from "../pages/icons/icons.component";
import { MapComponent } from "../pages/map/map.component";
import { UserComponent } from "../pages/user/user.component";
import { TablesComponent } from "../pages/tables/tables.component";
import { TypographyComponent } from "../pages/typography/typography.component";

export const BemVindoLayoutRoutes: Routes = [
  { path: "", component: InicialComponent },
  { path: "agendamento", component: AgendamentoComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent }
];
