import 'package:flutter/material.dart';

class QRCodeIconContainer extends StatelessWidget {
  const QRCodeIconContainer({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF1A237E);

    return Center(
      child: Container(
        width: 120,
        height: 120,
        decoration: BoxDecoration(
          color: primaryBlue,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.15),
              blurRadius: 10,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: const Center(
          child: Icon(Icons.qr_code, color: Colors.white, size: 60),
        ),
      ),
    );
  }
}
