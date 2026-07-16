import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../data/flags.dart';

class SheetPage extends StatelessWidget {
  const SheetPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color.fromRGBO(68, 107, 119, 0.384),
      child: Center(
        child: ListView.builder(
          padding: const EdgeInsets.all(10),
          itemCount: flags.length,
          itemBuilder: (context, index) {
            final f = flags[index];
            return Container(
              margin: const EdgeInsets.all(10),
              color: Colors.transparent,
              child: Column(
                children: [
                  Text(
                    '${f.name} ',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 20,
                      fontFamily: 'Papyrus',
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Container(
                    alignment: Alignment.center,
                    color: Colors.transparent,
                    child: Center(
                      child: SvgPicture.asset(
                        f.flag,
                        height: 80,
                        fit: BoxFit.contain,
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
