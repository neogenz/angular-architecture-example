En utilisant toutes les règles d'architecture angulaire, aide-moi à refactorer ceci : 
  - Extrait la logique "user-avatar" en créant un composant via la cli angular ici : projects/example-app/src/app/ui
  - Déplace le user-api.ts dans core, retire le provider de la route et passe le en providedIn root
  - Utilise le user-avatar dans user-profile-header 
  - Utilise le user-avatar dans la boucle des membres de la team dans @team.ts 
  - Utilise le ng-content, nommé "card-actions" pour ajouter le bouton "se déconnecter" depuis le composant @user-profile-header.ts à l'usage de user-avatar dans la vue. Quand il n'y a pas de card-actions,
   le mat-card-actions doit être inexistant dans le dom car il prend de l'espace pour rien sinon. 
  - Le code déplacé dans core appartient au domain "user"

  Respecte le nommage par domains dans Core, pour le service et les models, qui sont de la même feature peut être dans ce cas