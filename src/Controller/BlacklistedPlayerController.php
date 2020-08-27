<?php

namespace App\Controller;

use App\Entity\BlacklistedPlayer;
use App\Entity\Reason;
use App\Repository\BlacklistedPlayerRepository;
use App\Repository\ReasonRepository;
use App\Service\BlacklistedPlayerHelper;
use App\Service\JsonResponseTrait;
use App\Service\ReasonHelper;
use App\Service\RequestTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BlacklistedPlayerController
 * @package App\Controller
 * @Route("/api/player")
 */
class BlacklistedPlayerController extends AbstractController
{
    use JsonResponseTrait;
    use RequestTrait;

    /**
     * @Route("/all", name="all_players", methods={"GET"})
     * @param BlacklistedPlayerRepository $blacklistedPlayerRepository
     * @param BlacklistedPlayerHelper $blacklistedPlayerHelper
     * @return JsonResponse
     */
    public function allPlayers(
        BlacklistedPlayerRepository $blacklistedPlayerRepository,
        BlacklistedPlayerHelper $blacklistedPlayerHelper
    ): JsonResponse
    {
        $list = $blacklistedPlayerRepository->findAll();
        $returnedList = $blacklistedPlayerHelper->serializeMultiplePlayers($list);
        return $this->formattedJsonResponse($returnedList);
    }

    /**
     * @Route("/new", name="new_player", methods={"POST"})
     * @param Request $request
     * @param ReasonRepository $reasonRepository
     * @param ReasonHelper $reasonHelper
     * @param BlacklistedPlayerHelper $blacklistedPlayerHelper
     * @return JsonResponse
     */
    public function newPlayer(
        Request $request,
        ReasonRepository $reasonRepository,
        ReasonHelper $reasonHelper,
        BlacklistedPlayerHelper $blacklistedPlayerHelper
    ): JsonResponse
    {
        $manager = $this->getDoctrine()->getManager();
        $data = $this->handlePostRequest($request);
        if($blacklistedPlayerHelper->checkNameUniqueness($data->name) === false){
            return $this->formattedErrorJsonResponse('A player named "'. $data->name . '" already exists.');
        }
        $player = new BlacklistedPlayer();
        $player->setName($data->name);
        $player->setCreatedAt(new \DateTimeImmutable());
        foreach ($data->reasons as $reasonId){
            $reason = $reasonRepository->findOneBy(['id'=>$reasonId]);
            if($reason !== null){
                $player->addReason($reason);
            }
        }
        if($player->getReasons()->count() === 0){
            $reason = $reasonHelper->findOrCreateDefaultReason(Reason::DEFAULT_REASON_LABEL);
            $player->addReason($reason);
        }
        $manager->persist($player);
        $manager->flush();
        return $this->formattedJsonResponse($player->serialize());
    }

    /**
     * @Route("/delete/{id}", name="delete_player", methods={"DELETE"})
     * @param BlacklistedPlayer $player
     * @return JsonResponse
     */
    public function deletePlayer(
        BlacklistedPlayer $player
    ):JsonResponse
    {
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($player);
        $manager->flush();
        return $this->formattedJsonResponse("Player successfully deleted");
    }

    /**
     * @Route("/search/simple", name="search_player_simply", methods={"POST"})
     * @param Request $request
     * @param BlacklistedPlayerRepository $blacklistedPlayerRepository
     * @param BlacklistedPlayerHelper $blacklistedPlayerHelper
     * @return JsonResponse
     */
    public function findPlayersSimply(
        Request $request,
        BlacklistedPlayerRepository $blacklistedPlayerRepository,
        BlacklistedPlayerHelper $blacklistedPlayerHelper
    ):JsonResponse{
        $result = [];
        $data = $this->handlePostRequest($request);
        if(is_string($data->name) && $data->name !== ''){
            $result = $blacklistedPlayerRepository->findByName($data->name);
        }
        $result = $blacklistedPlayerHelper->serializeMultiplePlayers($result);
        return $this->formattedJsonResponse($result);
    }
}
