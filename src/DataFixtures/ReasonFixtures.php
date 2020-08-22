<?php

namespace App\DataFixtures;

use App\Entity\Reason;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ReasonFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $reasonNames = [
            "Other",
            "Intentionnal feeding",
            "AFK",
            "Bad player",
            "Toxic"
        ];

        foreach ($reasonNames as $reasonName){
            $reason = new Reason();
            $reason->setLabel($reasonName);
            $manager->persist($reason);
        }

        $manager->flush();
    }
}
