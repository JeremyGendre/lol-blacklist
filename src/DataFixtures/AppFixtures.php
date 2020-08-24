<?php

namespace App\DataFixtures;

use App\Entity\BlacklistedPlayer;
use App\Entity\Reason;
use App\Repository\ReasonRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{

    /**
     * @var ReasonRepository
     */
    private $reasonRepository;

    public function __construct(ReasonRepository $reasonRepository)
    {
        $this->reasonRepository = $reasonRepository;
    }

    public function load(ObjectManager $manager)
    {
        $reasonNames = [
            "Other",
            "Toxic",
            "Intentionnal feeding",
            "AFK",
            "Bad player",
        ];

        foreach ($reasonNames as $reasonName){
            $reason = new Reason();
            $reason->setLabel($reasonName);
            $manager->persist($reason);
        }

        $manager->flush();

        for($i = 0; $i < 4; $i++){
            $player = new BlacklistedPlayer();
            $player->setName('Nametest'.$i);
            $player->setCreatedAt(new \DateTimeImmutable());
            for($j = 0; $j < random_int(1,2); $j++){
                $player->addReason($this->reasonRepository->findOneBy([
                    'label' => $reasonNames[random_int(0,count($reasonNames)-1)]
                ]));
            }
            $manager->persist($player);
        }

        $manager->flush();
    }
}
