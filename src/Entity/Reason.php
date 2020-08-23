<?php

namespace App\Entity;

use App\Repository\ReasonRepository;
use App\Service\Serializer\MySerializerInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ReasonRepository::class)
 */
class Reason implements MySerializerInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $label;

    /**
     * @ORM\ManyToMany(targetEntity=BlacklistedPlayer::class, mappedBy="reasons")
     */
    private $blacklistedPlayers;

    public function __construct()
    {
        $this->blacklistedPlayers = new ArrayCollection();
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getLabel(): ?string
    {
        return $this->label;
    }

    /**
     * @param string $label
     * @return $this
     */
    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @return Collection|BlacklistedPlayer[]
     */
    public function getBlacklistedPlayers(): Collection
    {
        return $this->blacklistedPlayers;
    }

    /**
     * @param BlacklistedPlayer $blacklistedPlayer
     * @return $this
     */
    public function addBlacklistedPlayer(BlacklistedPlayer $blacklistedPlayer): self
    {
        if (!$this->blacklistedPlayers->contains($blacklistedPlayer)) {
            $this->blacklistedPlayers[] = $blacklistedPlayer;
            $blacklistedPlayer->addReason($this);
        }

        return $this;
    }

    /**
     * @param BlacklistedPlayer $blacklistedPlayer
     * @return $this
     */
    public function removeBlacklistedPlayer(BlacklistedPlayer $blacklistedPlayer): self
    {
        if ($this->blacklistedPlayers->contains($blacklistedPlayer)) {
            $this->blacklistedPlayers->removeElement($blacklistedPlayer);
            $blacklistedPlayer->removeReason($this);
        }

        return $this;
    }

    /**
     * @return string
     */
    public function __toString():string
    {
        return $this->label;
    }

    /**
     * @return array
     */
    public function serialize(): array
    {
        return [
            'id' => $this->id,
            'label' => $this->label
        ];
    }

    /**
     * @return array
     */
    public function serialisedAssociatedPlayers(): array
    {
        $result = [];
        foreach ($this->getBlacklistedPlayers() as $player){
            $result[] = $player->serialize();
        }
        return $result;
    }
}
