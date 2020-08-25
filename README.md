# SETUP
First, make sure you have **yarn** / **npm** installed as well as **composer**. Also, you'll need the **symfony cli** program which basically will simplify the PHP server command.

Secondly, duplicate the *.env* file and create a *.env.local* file that you can override in order to fill in the right information about the database and so on.

Then :
- ``composer install``
- ``yarn install`` or ``npm install``
- ``php bin/console doctrine:database:drop --force``
- ``php bin/console doctrine:database:create``
- ``php bin/console doctrine:migrations:migrate``
- ``php bin/console doctrine:fixtures:load --append``
- ``php bin/console cache:clear``
- ``yarn encore dev`` to make **webpack encore** watch and compile your js & css files
- ``symfony serve`` to start the php development server