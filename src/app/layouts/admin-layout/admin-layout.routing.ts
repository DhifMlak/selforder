import { AddItemsComponent } from './../../pages/items/add-items/add-items.component';
import { AddCategoryComponent } from './../../pages/categories/add-category/add-category.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BlankComponent } from '../../pages/blank/blank.component';
import { ModifierGroupsComponent } from '../../pages/modifier-groups/modifier-groups.component';
import { OverviewComponent } from '../../pages/overview/overview.component';
import { CategoriesComponent } from '../../pages/categories/categories.component';
import { MenusComponent } from '../../pages/menus/menus.component';
import { ItemsComponent } from '../../pages/items/items.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',       component: DashboardComponent },
    { path: 'user-profile',    component: UserProfileComponent },
    { path: 'tables',          component: TablesComponent },
    { path: 'icons',           component: IconsComponent },
    { path: 'maps',            component: MapsComponent },
    { path: 'blank',           component: BlankComponent },
    { path: 'menu',            component: OverviewComponent , children: [
        { path: 'menus',           component: MenusComponent },
        
        { path: 'overview',        component: OverviewComponent },
        { path: 'modifer-groups',  component: ModifierGroupsComponent }
    ] },
    { path: 'menu/categories',      component: CategoriesComponent },
    { path: 'menu/categories/add',      component: AddCategoryComponent },
    { path: 'menu/items',           component: ItemsComponent },
    { path: 'menu/items/add',           component: AddItemsComponent },


];
