<?php

namespace Thibautg16\SqueletteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class SqueletteController extends Controller
{
    public function indexAction()
    {
        return $this->render('@Thibautg16Squelette/squelette/index.html.twig');
    }
}
