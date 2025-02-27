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

    /**
     * @param string $label
     * @return bool
     */
    public function checkLabelUniqueness(string $label){
        $reason = $this->reasonRepository->findOneBy(['label'=> $label]);
        return $reason === null;
    }

    /**
     * @param Reason[] $reasonsList
     * @param string $type
     * @return array
     */
    public static function serializeMultipleReasons(
        $reasonsList,
        $type = 'default'
    ):array {
        $returnedValue = [];
        foreach ($reasonsList as $reason){
            switch($type){
                case 'select':
                    $returnedValue[] = $reason->serializeForSelect();
                    break;
                default:
                    $returnedValue[] = $reason->serialize();
                    break;
            }
        }
        return $returnedValue;
    }
}