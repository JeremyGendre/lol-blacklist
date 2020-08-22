<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200822191219 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE blacklisted_player (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE blacklisted_player_reason (blacklisted_player_id INT NOT NULL, reason_id INT NOT NULL, INDEX IDX_E73D66F66CF76332 (blacklisted_player_id), INDEX IDX_E73D66F659BB1592 (reason_id), PRIMARY KEY(blacklisted_player_id, reason_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reason (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE blacklisted_player_reason ADD CONSTRAINT FK_E73D66F66CF76332 FOREIGN KEY (blacklisted_player_id) REFERENCES blacklisted_player (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE blacklisted_player_reason ADD CONSTRAINT FK_E73D66F659BB1592 FOREIGN KEY (reason_id) REFERENCES reason (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE blacklisted_player_reason DROP FOREIGN KEY FK_E73D66F66CF76332');
        $this->addSql('ALTER TABLE blacklisted_player_reason DROP FOREIGN KEY FK_E73D66F659BB1592');
        $this->addSql('DROP TABLE blacklisted_player');
        $this->addSql('DROP TABLE blacklisted_player_reason');
        $this->addSql('DROP TABLE reason');
    }
}
