<?php

namespace App\Service;

use App\Entity\Reason;
use App\Repository\ReasonRepository;

/**
 * Class ReasonHelper
 * @package App\Service
 */
class ReasonHelper
{
    /**
     * @var ReasonRepository
     */
    private $reasonRepository;

    public function __construct(ReasonRepository $reasonRepository)
    {
        $this->reasonRepository = $reasonRepository;
    }

    /**
     * @param $reasonLabel
     * @return Reason
     */
    public function findOrCreateDefaultReason($reasonLabel)
    {
        $reason = $this->reasonRepository->findOneBy(['label' => $reasonLabel]);
        if($reason === null){
            $reason = $this->createDefaultReason();
        }
        return $reason;
    }

    /**
     * @return Reason
     */
    public function createDefaultReason():Reason
    {
        $reason = new Reason();
        $reason->setLabel(Reason::DEFAULT_REASON_LABEL);
        return $reason;
    }
}