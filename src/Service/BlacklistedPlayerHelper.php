<?php


namespace App\Service;


use App\Repository\BlacklistedPlayerRepository;

class BlacklistedPlayerHelper
{
    /**
     * @var BlacklistedPlayerRepository
     */
    private $blacklistedPlayerRepository;

    public function __construct(BlacklistedPlayerRepository $blacklistedPlayerRepository)
    {
        $this->blacklistedPlayerRepository = $blacklistedPlayerRepository;
    }

    /**
     * @param string $playerName
     * @return bool
     */
    public function checkNameUniqueness(string $playerName){
        $existingPlayer = $this->blacklistedPlayerRepository->findOneBy(['name'=>$playerName]);
        return $existingPlayer === null;
    }
}