import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';
import { stringify } from 'querystring';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})

export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute ,
    private recipesService: RecipesService,
    private router: Router,
    private alrtController: AlertController
    ) {
    }

  ngOnInit() {
    // Once something has been inputted in the URL in the place of recipeID.
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeID')) {
         // redirect
        this.router.navigate(['/recipes']);
        return;
      }

      // get the value in placeID
      const recipeID = paramMap.get('recipeID');
      this.loadedRecipe = this.recipesService.getRecipe(recipeID);
    });
  }

  ondeleteRecipe() {
    this.alrtController.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
            this.recipesService.deleteRecipe(this.loadedRecipe.id);
            this.router.navigate(['/recipes']);
        }
      }
    ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
